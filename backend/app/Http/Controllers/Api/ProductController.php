<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with('category');

        if ($request->filled('category')) {
            $query->whereHas('category', function ($q) use ($request) {
                $q->where('slug', $request->category);
            });
        }

        if ($request->filled('search')) {
            $search = $request->search;

            $query->where(function ($q) use ($search) {
                $q->where('name_en', 'like', "%{$search}%")
                  ->orWhere('name_ar', 'like', "%{$search}%")
                  ->orWhere('description_en', 'like', "%{$search}%")
                  ->orWhere('description_ar', 'like', "%{$search}%");
            });
        }

        if ($request->filled('featured')) {
            $query->where('is_featured', filter_var($request->featured, FILTER_VALIDATE_BOOLEAN));
        }

        if ($request->filled('antique')) {
            $query->where('is_antique', filter_var($request->antique, FILTER_VALIDATE_BOOLEAN));
        }

        $products = $query->latest()->get();

        return response()->json($products);
    }

    public function featured()
    {
        $products = Product::with('category')
            ->where('is_featured', true)
            ->latest()
            ->take(8)
            ->get();

        return response()->json($products);
    }

    public function show($id)
    {
        $product = Product::with('category')->findOrFail($id);

        return response()->json($product);
    }
}