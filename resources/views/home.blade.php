@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-12 mb-5">
            <div class="card">
                <div class="card-header">Dashboard</div>

                <div class="card-body">
                    @if (session('status'))
                    <div class="alert alert-success" role="alert">
                        {{ session('status') }}
                    </div>
                    @endif

                    You are logged in!
                </div>
            </div>
        </div>

        <div class="col-12 col-md-4 col-lg-3">
            <div class="list-group">
                <a href="#" class="list-group-item list-group-item-action active">
                    <h5 class="mb-1">Tugas</h5>
                </a>
                <a href="#" class="list-group-item list-group-item-action">
                    <h5 class="mb-1">Tugas Selesai</h5>
                </a>
            </div>
        </div>
        <div class="col-12 col-md-8 col-lg-9">
            <div class="form-group">
                <p>
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample1"
                        aria-expanded="true" aria-controls="collapseExample">
                        Terlewatkan
                    </button>
                </p>
                <div class="collapse fade show" id="collapseExample1">
                    <div class="card-wrapper">
                        <input type="checkbox" name="" id="" value="checkedValue" checked>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, amet!
                        </p>
                    </div>
                    <div class="card-wrapper">
                        <input type="checkbox" name="" id="" value="checkedValue" checked>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, in?
                        </p>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <p>
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample2"
                        aria-expanded="true" aria-controls="collapseExample">
                        Hari Ini
                    </button>
                </p>
                <div class="collapse fade show" id="collapseExample2">
                    <div class="card-wrapper">
                        <input type="checkbox" name="" id="" value="checkedValue" checked>
                        <p>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellendus, amet!
                        </p>
                    </div>
                    <div class="card-wrapper">
                        <input type="checkbox" name="" id="" value="checkedValue" checked>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Necessitatibus, in?
                        </p>
                    </div>
                    <small>5 of 8</small>
                </div>
            </div>
            <div class="form-group">
                <p>
                    <button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample3"
                        aria-expanded="true" aria-controls="collapseExample">
                        Akan Datang
                    </button>
                </p>
                <div class="collapse fade show" id="collapseExample3">
                    <div class="card-wrapper">
                        <input type="checkbox" name="" id="" value="checkedValue" checked>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa, explicabo. Lorem ipsum
                            dolor
                            sit amet, consectetur adipisicing elit. Impedit est nulla fugit. Recusandae delectus eum
                            ducimus animi vero molestias, quaerat aut error quam omnis tenetur facilis voluptas
                            quae,
                            voluptatem dolorem?
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@push('styles')
<style>
    .card-wrapper {
        display: flex;
        position: relative;
        width: 100%;
        height: auto;
        border: 1px solid #e2e2e2;
        padding: .5rem 1rem;
        border-radius: 7px;
        margin-bottom: .5rem;
    }

    .card-wrapper input[type=checkbox] {
        position: relative;
        margin-right: 1rem;
        margin-top: .5rem;
    }

    .card-wrapper p {
        margin: 0
    }
</style>
@endpush
