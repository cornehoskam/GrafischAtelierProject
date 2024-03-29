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
@include('layouts.header', array('title'=>'Cursuspagina'))
<div class="container">
    <h3>Cursussen</h3>
    @foreach ($courses as $course)
        @if( ($loop->index % 3) == 0 )
            <div class="row">
                @endif
                <div class="col-lg-4 col-md-4 col-sm-4 col-sm-offset-0 col-xs-10 col-xs-offset-1">
                    @php
                    if($course->max_signups == null)
                    {
                        $course->max_signups = "∞";
                    }
                    echo "<h4>".$course->name." - ".\App\Courses_has_user::getSignedUp($course->id)."/".$course->max_signups." ingeschreven </h4>";
                    echo "<p>".substr($course->start_date,0,-3)." - ".substr($course->end_date,0,-3)."</p>";
                    echo "<p>Door ".$course->coursegiver_name."</p>";
                    echo "<p>".$course->description." </p>";

                    @endphp
                    {{ Form::open(['route' => 'course_reservation']) }}
                    {{ Form::hidden('id', $course->id) }}
                    <input class="btn btn-primary" type="submit" value="Inschrijven">
                    {{ Form::close()}}
                </div>
                @if( ($loop->index % 3) == 2)
            </div>
        @endif
    @endforeach
</div>
</div>
@include('layouts.footer')
</body>
</html>

