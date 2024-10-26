<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use App\Models\Product;
use App\Models\Tag;
use App\Models\ProductImage;
use App\Models\ProductReview;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * This seeder will fetch a JSON object from https://dummyjson.com/products and
     * create a Product model instance for each product in the JSON object. It will
     * also create a Tag model for each tag in the product's tags array, and create
     * a ProductImage model for each image in the product's images array. Finally,
     * it will create a ProductReview model for each review in the product's reviews
     * array.
     */
    public function run(): void
    {
        $response = Http::get('https://dummyjson.com/products');
        $products = $response->json('products');

        foreach ($products as $productData) {
            $product = Product::create([
                'title' => $productData['title'],
                'description' => $productData['description'],
                'category' => $productData['category'],
                'price' => $productData['price'],
                'discount_percentage' => $productData['discountPercentage'],
                'rating' => $productData['rating'],
                'stock' => $productData['stock'],
                'brand' => $productData['brand'] ?? null,
                'weight' => $productData['weight'],
                'dimensions' => json_encode($productData['dimensions']),
                'thumbnail' => $productData['thumbnail']
            ]);
            
            foreach ($productData['tags'] as $tagName) {
                $tag = Tag::firstOrCreate(['name' => $tagName]);
                $product->tags()->attach($tag->id, [
                    'created_at' => now(),
                    'updated_at' => now()
                ]);
            }

            foreach ($productData['images'] as $imageUrl) {
                ProductImage::create([
                    'product_id' => $product->id,
                    'url' => $imageUrl
                ]);
            }

            foreach ($productData['reviews'] as $reviewData) {
                ProductReview::create([
                    'product_id' => $product->id,
                    'rating' => $reviewData['rating'],
                    'comment' => $reviewData['comment'],
                    'reviewer_name' => $reviewData['reviewerName'],
                    'reviewer_email' => $reviewData['reviewerEmail'],
                    'created_at' => $reviewData['date']
                ]);
            }
        }
    }
}
