<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\MainController as ControllersMainController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductEditController;
use App\Http\Controllers\ProductListingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/main', [ControllersMainController::class, 'main']);
    Route::get('/product', [ProductController::class, 'product']);
    Route::get('/categorys', [ProductController::class, 'getCategories']);
    Route::get('/getCategory', [ProductController::class, 'getCategory'])->name('getCategory');
    Route::get('/index', [ProductController::class, 'index'])->name('index');

    Route::delete('/deleteProduct/{id}', [ProductController::class, 'deleteProduct']);
    Route::get('/show', [ProductController::class, 'show']);
    Route::delete('/destroy', [ProductController::class, 'destroy']);
    Route::get('/edit/{id}', [ProductController::class, 'edit'])->name('edit');
    // Route::post('/update/{id}', [ProductController::class, 'update'])->name('update');
    // Route::put('/updateProduct/{id}', [ProductController::class, 'update']);
    
   // In web.php (routes)
// Show the edit form (GET request)
Route::get('/product/edit/{id}', [ProductEditController::class, 'edit'])->name('product.edit');

// Update the product (PUT request)
Route::put('/product/update/{id}', [ProductEditController::class, 'update'])->name('product.update');

    Route::get('/category', [CategoryController::class, 'category']);
    Route::get('/getCategory', [CategoryController::class, 'getCategory'])->name('getCategory');
    Route::get('/index', [CategoryController::class, 'index'])->name('index');
    Route::post('/category', [CategoryController::class, 'store']);
    Route::put('/update', [CategoryController::class, 'update']);

    Route::get('/order', [OrderController::class, 'order']);
    Route::get('/product-listing', [ProductListingController::class, 'ProductListing'])->name('product.listing');

    Route::get('/member', [MemberController::class, 'member']);
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
