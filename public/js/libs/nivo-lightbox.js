/*
 * Nivo Lightbox v1.0
 * http://dev7studios.com/nivo-lightbox
 *
 * Copyright 2013, Dev7studios
 * Free to use and abuse under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 */

(function (e, t, n, r) {
    function o(t, n) {
        this.el = t;
        this.$el = e(this.el);
        this.options = e.extend({}, s, n);
        this._defaults = s;
        this._name = i;
        this.init()
    }
    var i = "nivoLightbox",
        s = {
            effect: "fade",
            theme: "default",
            keyboardNav: true,
            onInit: function () {},
            beforeShowLightbox: function () {},
            afterShowLightbox: function (e) {},
            beforeHideLightbox: function () {},
            afterHideLightbox: function () {},
            onPrev: function (e) {},
            onNext: function (e) {},
            errorMessage: "The requested content cannot be loaded. Please try again later."
        };
    o.prototype = {
        init: function () {
            var t = this;
            this.$el.on("click", function (e) {
                e.preventDefault();
                t.showLightbox()
            });
            if (this.options.keyboardNav) {
                e("body").off("keyup").on("keyup", function (n) {
                    var r = n.keyCode ? n.keyCode : n.which;
                    if (r == 27) t.destructLightbox();
                    if (r == 37) e(".nivo-lightbox-prev").trigger("click");
                    if (r == 39) e(".nivo-lightbox-next").trigger("click")
                })
            }
            this.options.onInit.call(this)
        },
        showLightbox: function () {
            var t = this;
            this.options.beforeShowLightbox.call(this);
            var n = this.constructLightbox();
            if (!n) return;
            var r = n.find(".nivo-lightbox-content");
            if (!r) return;
            var i = this.$el;
            e("body").addClass("nivo-lightbox-body-effect-" + this.options.effect);
            this.processContent(r, i);
            if (this.$el.attr("data-lightbox-gallery")) {
                var t = this,
                    s = e('[data-lightbox-gallery="' + this.$el.attr("data-lightbox-gallery") + '"]');
                e(".nivo-lightbox-nav").show();
                e(".nivo-lightbox-prev").off("click").on("click", function (n) {
                    n.preventDefault();
                    var o = s.index(i);
                    i = s.eq(o - 1);
                    if (!e(i).length) i = s.last();
                    t.processContent(r, i);
                    t.options.onPrev.call(this, [i])
                });
                e(".nivo-lightbox-next").off("click").on("click", function (n) {
                    n.preventDefault();
                    var o = s.index(i);
                    i = s.eq(o + 1);
                    if (!e(i).length) i = s.first();
                    t.processContent(r, i);
                    t.options.onNext.call(this, [i])
                })
            }
            setTimeout(function () {
                n.addClass("nivo-lightbox-open");
                t.options.afterShowLightbox.call(this, [n])
            }, 1)
        },
        processContent: function (n, r) {
            var i = this;
            var s = r.attr("href");
            n.html("").addClass("nivo-lightbox-loading");
            if (this.isHidpi() && r.attr("data-lightbox-hidpi")) {
                s = r.attr("data-lightbox-hidpi")
            }
            if (s.match(/\.(jpeg|jpg|gif|png)$/) != null) {
                var o = e("<img>", {
                    src: s
                });
                o.one("load", function () {
                    var r = e('<div class="nivo-lightbox-image" />');
                    r.append(o);
                    n.html(r).removeClass("nivo-lightbox-loading");
                    r.css({
                        "line-height": e(".nivo-lightbox-content").height() + "px",
                        height: e(".nivo-lightbox-content").height() + "px"
                    });
                    e(t).resize(function () {
                        r.css({
                            "line-height": e(".nivo-lightbox-content").height() + "px",
                            height: e(".nivo-lightbox-content").height() + "px"
                        })
                    })
                }).each(function () {
                    if (this.complete) e(this).load()
                });
                o.error(function () {
                    var t = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
                    n.html(t).removeClass("nivo-lightbox-loading")
                })
            } else if (video = s.match(/(youtube|youtu|vimeo)\.(com|be)\/(watch\?v=(\w+)|(\w+))/)) {
                var u = "",
                    a = "nivo-lightbox-video";
                if (video[1] == "youtube") {
                    u = "http://www.youtube.com/v/" + video[4];
                    a = "nivo-lightbox-youtube"
                }
                if (video[1] == "youtu") {
                    u = "http://www.youtube.com/v/" + video[3];
                    a = "nivo-lightbox-youtube"
                }
                if (video[1] == "vimeo") {
                    u = "http://player.vimeo.com/video/" + video[3];
                    a = "nivo-lightbox-vimeo"
                }
                if (u) {
                    var f = e("<iframe>", {
                        src: u,
                        "class": a,
                        frameborder: 0,
                        vspace: 0,
                        hspace: 0,
                        scrolling: "auto"
                    });
                    n.html(f);
                    f.load(function () {
                        n.removeClass("nivo-lightbox-loading")
                    })
                }
            } else if (r.attr("data-lightbox-type") == "ajax") {
                var i = this;
                e.ajax({
                    url: s,
                    cache: false,
                    success: function (r) {
                        var i = e('<div class="nivo-lightbox-ajax" />');
                        i.append(r);
                        n.html(i).removeClass("nivo-lightbox-loading");
                        if (i.outerHeight() < n.height()) {
                            i.css({
                                position: "relative",
                                top: "50%",
                                "margin-top": -(i.outerHeight() / 2) + "px"
                            })
                        }
                        e(t).resize(function () {
                            if (i.outerHeight() < n.height()) {
                                i.css({
                                    position: "relative",
                                    top: "50%",
                                    "margin-top": -(i.outerHeight() / 2) + "px"
                                })
                            }
                        })
                    },
                    error: function () {
                        var t = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
                        n.html(t).removeClass("nivo-lightbox-loading")
                    }
                })
            } else if (s.substring(0, 1) == "#") {
                if (e(s).length) {
                    var l = e('<div class="nivo-lightbox-inline" />');
                    l.append(e(s).clone().show());
                    n.html(l).removeClass("nivo-lightbox-loading");
                    if (l.outerHeight() < n.height()) {
                        l.css({
                            position: "relative",
                            top: "50%",
                            "margin-top": -(l.outerHeight() / 2) + "px"
                        })
                    }
                    e(t).resize(function () {
                        if (l.outerHeight() < n.height()) {
                            l.css({
                                position: "relative",
                                top: "50%",
                                "margin-top": -(l.outerHeight() / 2) + "px"
                            })
                        }
                    })
                } else {
                    var l = e('<div class="nivo-lightbox-error"><p>' + i.options.errorMessage + "</p></div>");
                    n.html(l).removeClass("nivo-lightbox-loading")
                }
            } else {
                var f = e("<iframe>", {
                    src: s,
                    "class": "nivo-lightbox-item",
                    frameborder: 0,
                    vspace: 0,
                    hspace: 0,
                    scrolling: "auto"
                });
                n.html(f);
                f.load(function () {
                    n.removeClass("nivo-lightbox-loading")
                })
            }
            if (r.attr("title")) {
                var c = e("<span>", {
                    "class": "nivo-lightbox-title"
                });
                c.text(r.attr("title"));
                e(".nivo-lightbox-title-wrap").html(c)
            } else {
                e(".nivo-lightbox-title-wrap").html("")
            }
        },
        constructLightbox: function () {
            if (e(".nivo-lightbox-overlay").length) return e(".nivo-lightbox-overlay");
            var t = e("<div>", {
                "class": "nivo-lightbox-overlay nivo-lightbox-theme-" + this.options.theme + " nivo-lightbox-effect-" + this.options.effect
            });
            var n = e("<div>", {
                "class": "nivo-lightbox-wrap"
            });
            var r = e("<div>", {
                "class": "nivo-lightbox-content"
            });
            var i = e('<a href="#" class="nivo-lightbox-nav nivo-lightbox-prev">Previous</a><a href="#" class="nivo-lightbox-nav nivo-lightbox-next">Next</a>');
            var s = e('<a href="#" class="nivo-lightbox-close" title="Close">Close</a>');
            var o = e("<div>", {
                "class": "nivo-lightbox-title-wrap"
            });
            var u = 0;
            if (u) t.addClass("nivo-lightbox-ie");
            n.append(r);
            n.append(o);
            t.append(n);
            t.append(i);
            t.append(s);
            e("body").append(t);
            var a = this;
            t.on("click", function (t) {
                if (t.target === this || e(t.target).hasClass("nivo-lightbox-content") || e(t.target).hasClass("nivo-lightbox-image")) a.destructLightbox()
            });
            s.on("click", function (e) {
                e.preventDefault();
                a.destructLightbox()
            });
            return t
        },
        destructLightbox: function () {
            var t = this;
            this.options.beforeHideLightbox.call(this);
            e(".nivo-lightbox-overlay").removeClass("nivo-lightbox-open");
            e(".nivo-lightbox-nav").hide();
            e("body").removeClass("nivo-lightbox-body-effect-" + t.options.effect);
            var n = 0;
            if (n) {
                e(".nivo-lightbox-overlay iframe").attr("src", " ");
                e(".nivo-lightbox-overlay iframe").remove()
            }
            e(".nivo-lightbox-prev").off("click");
            e(".nivo-lightbox-next").off("click");
            this.options.afterHideLightbox.call(this)
        },
        isHidpi: function () {
            var e = "(-webkit-min-device-pixel-ratio: 1.5),							  (min--moz-device-pixel-ratio: 1.5),							  (-o-min-device-pixel-ratio: 3/2),							  (min-resolution: 1.5dppx)";
            if (t.devicePixelRatio > 1) return true;
            if (t.matchMedia && t.matchMedia(e).matches) return true;
            return false
        }
    };
    e.fn[i] = function (t) {
        return this.each(function () {
            if (!e.data(this, i)) {
                e.data(this, i, new o(this, t))
            }
        })
    }
})(jQuery, window, document)
