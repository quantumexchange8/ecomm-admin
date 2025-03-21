<?php

namespace App\Http\Controllers;
use Inertia\Inertia;
use Illuminate\Http\Request;

class MainController extends Controller
{
    public function Main()
    {
        return Inertia::render('Main/Main');
    }
}
