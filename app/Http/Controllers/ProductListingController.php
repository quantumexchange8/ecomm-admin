<?php

namespace App\Http\Controllers;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
class ProductListingController extends Controller
{
    public function ProductListing()
    {
        $products = Product::with('media')->get()->map(function ($product) {
            return [
                'id' => $product->id,
                'name' => $product->name,
                'sku' => $product->sku,
                'description' => $product->description,
                'price' => $product->price,
                'stock' => $product->stock,
                'category_id' => $product->category_id,
                'weight' => $product->weight,
                'width' => $product->width,
                'length' => $product->length,
                'height' => $product->height,
                'fragile' => $product->fragile,
                'status' => $product->status,
                'image' => $product->getFirstMediaUrl('product_images'), // Get image URL
            ];
        });

        return Inertia::render('Product/ProductListing', ['products' => $products]);
    }
}
