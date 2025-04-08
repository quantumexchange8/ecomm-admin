<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class GlobalController extends Controller
{
    public function getCategory()
    {

        $categories = Category::where('status', 'active')->get();

        return response()->json($categories);
    }
}
