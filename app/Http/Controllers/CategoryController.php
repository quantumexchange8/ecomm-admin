<?php

namespace App\Http\Controllers;
use App\Models\Category;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function category()
    {
        return Inertia::render('Category/Category');
    }
    
    public function store(Request $request)
    {
        //dd($request->all());
        $request->validate([
            'name' => 'required|string|max:255',
            'slug' => 'required|string',
            'parent_id' => 'nullable|string',
            'level' => 'required|integer',
            'description' => 'nullable|string|max:255',
            'status' => 'required|string',
        ]);

        Category::create([
            'name' => $request->name,
            'slug' => $request->slug,
            'parent_id' => $request->parent_id,
            'level' => $request->level,
            'description' => $request->description,
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Category created successfully.');
    }
    public function index()
    {
        $categories = Category::all(); 
        return response()->json($categories);

    }
    public function getCategory()
    {
        $categories = Category::where('status', 'active')->get();
    
        return response()->json($categories);
    }

    public function update(Request $request)
{
    $category = Category::find($request->id);
    
    if (!$category) {
        return response()->json(['message' => 'Category not found'], 404);
    }

    $category->status = $request->status;
    $category->save();

    return response()->json(['message' => 'Status updated successfully']);
}


}
