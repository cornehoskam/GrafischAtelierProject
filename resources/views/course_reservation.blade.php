<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <link rel="stylesheet" type="text/css" href="{{ URL::asset('css/app.css') }}">
    <script src="{{ URL::asset('js/app.js') }}"></script>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js"></script>
    <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
</head>
<body>
@include('layouts.header', array('title'=>'Cursusoverzicht'))

<div class="container">

<div class="title">
    <div class="col-lg-3 col-md-3 col-sm-3 col-sm-offset-0 col-xs-4"> </div>
    <div class="col-lg-6 col-md-6 col-sm-6 col-sm-offset-0 col-xs-4">
    <h3>{{ $course->name}}</h3>
    <p>{{$course->description}}</p>
    <p>Door: <i>{{ $course->coursegiver_name }}</i></p>
    <p>Kosten: &euro;{{$course->price}}</p>
    <p>De cursus is van {{substr($course->start_date,0,-3)}} tot {{substr($course->end_date,0,-3)}}</p>
    <p><i>{{\App\Courses_has_user::getSignedUp($course->id)}}/{{$course->max_signups}} ingeschreven</i> </p>

    {{Form::open(['route' => 'submitCourseReservation'])}}
    <input type="hidden" name="id"  value="{{$course->id}}">
    @if (\App\Courses_has_user::all()->where("user_id", "=", Auth::user()->id)->where("course_id", "=", $course->id)->count() > 0)
        <div style="color: red;">U bent al ingeschreven voor deze cursus.</div>
    @elseif (\App\Courses_has_user::getSignedUp($course->id) >= $course->max_signups)
        <div style="color: red;">De cursus is al vol.</div>
    @else
        <input type="submit" name="btnInsertReservation" value="Inschrijven" class="btn btn-primary">
    @endif
    {{Form::close()}}
    </div>
    <div class="col-lg-3 col-md-3 col-sm-3 col-sm-offset-0 col-xs-4"></div>
</div>

</div>


@include('layouts.footer')
</body>