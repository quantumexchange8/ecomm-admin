<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function member()
    {
        $users = User::all(); // Retrieve all users

        return Inertia::render('Member/Member', [
            'users' => $users, // Pass members to Inertia
        ]);
    }
    
}
