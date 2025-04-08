<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\GlobalController;
use App\Http\Controllers\MainController as ControllersMainController;
use App\Http\Controllers\MemberController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\ProductEditController;
use App\Http\Controllers\ProductListingController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('login');

Route::middleware(['auth', 'verified'])->group(function () {
    /**
     * ==============================
     *           Dashboard
     * ==============================
    */
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::get('/main', [ControllersMainController::class, 'main']);
    
    Route::get('/categorys', [ProductController::class, 'getCategories']);
    Route::get('/getCategory', [ProductController::class, 'getCategory'])->name('getCategory');
    Route::get('/index', [ProductController::class, 'index'])->name('index');
    Route::post('/store-product', [ProductController::class, 'storeProduct'])->name('store-product');
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

    /**
     * ==============================
     *           Product
     * ==============================
    */
    Route::get('/create-product', [ProductController::class, 'createProduct'])->name('create-product');
    Route::post('/store-product', [ProductController::class, 'storeProduct'])->name('store-product');

    Route::get('/edit-product/{id}', [ProductController::class, 'editProduct'])->name('edit-product');
    Route::post('/update-product', [ProductController::class, 'updateProduct'])->name('update-product');

    /**
     * ==============================
     *           Global use
     * ==============================
    */
    
    Route::get('/getCategory', [GlobalController::class, 'getCategory'])->name('getCategory');


});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
