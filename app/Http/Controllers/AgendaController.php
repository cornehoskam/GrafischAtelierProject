<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AgendaController extends Controller
{

    function show()
    {
        return view('agenda');
    }
}