<?php

namespace App\Http\Controllers\Api\Admin;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name_ar' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'description_ar' => ['required', 'string'],
            'description_en' => ['required', 'string'],
            'price' => ['required', 'numeric'],
            'discount_price' => ['nullable', 'numeric'],
            'stock' => ['required', 'integer'],
            'is_featured' => ['nullable', 'in:0,1'],
            'is_antique' => ['nullable', 'in:0,1'],
            'material' => ['nullable', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:255'],
            'dimensions' => ['nullable', 'string', 'max:255'],
            'rating' => ['nullable', 'numeric'],
            'image' => ['required', 'file', 'image', 'mimes:jpg,jpeg,png,webp,gif,bmp,svg', 'max:8192'],
        ]);

        $imagePath = $request->file('image')->store('products', 'public');

        $product = Product::create([
            'category_id' => $validated['category_id'],
            'name_ar' => $validated['name_ar'],
            'name_en' => $validated['name_en'],
            'description_ar' => $validated['description_ar'],
            'description_en' => $validated['description_en'],
            'price' => $validated['price'],
            'discount_price' => $validated['discount_price'] ?? null,
            'image' => 'storage/' . $imagePath,
            'gallery' => null,
            'stock' => $validated['stock'],
            'is_featured' => ($validated['is_featured'] ?? '0') == '1',
            'is_antique' => ($validated['is_antique'] ?? '0') == '1',
            'material' => $validated['material'] ?? null,
            'color' => $validated['color'] ?? null,
            'dimensions' => $validated['dimensions'] ?? null,
            'rating' => $validated['rating'] ?? 5.0,
        ]);

        return response()->json([
            'message' => 'Product created successfully',
            'data' => $product,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $product = Product::findOrFail($id);

        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name_ar' => ['required', 'string', 'max:255'],
            'name_en' => ['required', 'string', 'max:255'],
            'description_ar' => ['required', 'string'],
            'description_en' => ['required', 'string'],
            'price' => ['required', 'numeric'],
            'discount_price' => ['nullable', 'numeric'],
            'stock' => ['required', 'integer'],
            'is_featured' => ['nullable', 'in:0,1'],
            'is_antique' => ['nullable', 'in:0,1'],
            'material' => ['nullable', 'string', 'max:255'],
            'color' => ['nullable', 'string', 'max:255'],
            'dimensions' => ['nullable', 'string', 'max:255'],
            'rating' => ['nullable', 'numeric'],
            'image' => ['nullable', 'file', 'image', 'mimes:jpg,jpeg,png,webp,gif,bmp,svg', 'max:8192'],
        ]);

        $imagePath = $product->image;

        if ($request->hasFile('image')) {
            if ($product->image && str_starts_with($product->image, 'storage/')) {
                $oldPath = str_replace('storage/', '', $product->image);
                Storage::disk('public')->delete($oldPath);
            }

            $newImagePath = $request->file('image')->store('products', 'public');
            $imagePath = 'storage/' . $newImagePath;
        }

        $product->update([
            'category_id' => $validated['category_id'],
            'name_ar' => $validated['name_ar'],
            'name_en' => $validated['name_en'],
            'description_ar' => $validated['description_ar'],
            'description_en' => $validated['description_en'],
            'price' => $validated['price'],
            'discount_price' => $validated['discount_price'] ?? null,
            'image' => $imagePath,
            'stock' => $validated['stock'],
            'is_featured' => ($validated['is_featured'] ?? '0') == '1',
            'is_antique' => ($validated['is_antique'] ?? '0') == '1',
            'material' => $validated['material'] ?? null,
            'color' => $validated['color'] ?? null,
            'dimensions' => $validated['dimensions'] ?? null,
            'rating' => $validated['rating'] ?? 5.0,
        ]);

        return response()->json([
            'message' => 'Product updated successfully',
            'data' => $product,
        ]);
    }

    public function destroy($id)
    {
        $product = Product::findOrFail($id);

        if ($product->image && str_starts_with($product->image, 'storage/')) {
            $oldPath = str_replace('storage/', '', $product->image);
            Storage::disk('public')->delete($oldPath);
        }

        $product->delete();

        return response()->json([
            'message' => 'Product deleted successfully',
        ]);
    }
}