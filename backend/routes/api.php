<?php use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\CategoryController;
 use App\Http\Controllers\Api\ProductController;
  use App\Http\Controllers\Api\ContactController;
   use App\Http\Controllers\Api\OrderController;
   use App\Http\Controllers\Api\Admin\ProductController as AdminProductController;
    Route::get('/categories', [CategoryController::class, 'index']); 
    Route::get('/products', [ProductController::class, 'index']);
     Route::get('/products/featured', [ProductController::class, 'featured']); Route::get('/products/{id}', [ProductController::class, 'show']); 
     Route::post('/contact', [ContactController::class, 'store']);
      Route::post('/checkout', [OrderController::class, 'store']);
      Route::post('/admin/products', [AdminProductController::class, 'store']);
Route::put('/admin/products/{id}', [AdminProductController::class, 'update']);
Route::delete('/admin/products/{id}', [AdminProductController::class, 'destroy']);

