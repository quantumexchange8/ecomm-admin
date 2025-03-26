<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function member()
    {
        return Inertia::render('Member/Member');
    }
    
}
