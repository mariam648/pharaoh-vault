<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            ['name_ar' => 'إكسسوارات', 'name_en' => 'Accessories', 'slug' => 'accessories'],
            ['name_ar' => 'أنتيكات', 'name_en' => 'Antiques', 'slug' => 'antiques'],
            ['name_ar' => 'سراير', 'name_en' => 'Beds', 'slug' => 'beds'],
            ['name_ar' => 'سجاد', 'name_en' => 'Carpets', 'slug' => 'carpets'],
            ['name_ar' => 'ستاير', 'name_en' => 'Curtains', 'slug' => 'curtains'],
            ['name_ar' => 'أبواب', 'name_en' => 'Doors', 'slug' => 'doors'],
            ['name_ar' => 'مرايات', 'name_en' => 'Mirrors', 'slug' => 'mirrors'],
            ['name_ar' => 'أكواب', 'name_en' => 'Mugs', 'slug' => 'mugs'],
            ['name_ar' => 'أطباق', 'name_en' => 'Plates', 'slug' => 'plates'],
            ['name_ar' => 'أواني', 'name_en' => 'Pots', 'slug' => 'pots'],
            ['name_ar' => 'كنب', 'name_en' => 'Sofas', 'slug' => 'sofas'],
            ['name_ar' => 'ترابيزات', 'name_en' => 'Tables', 'slug' => 'tables'],
            ['name_ar' => 'فازات', 'name_en' => 'Vases', 'slug' => 'vases'],
            ['name_ar' => 'دولايب', 'name_en' => 'Wardrobes', 'slug' => 'wardrobes'],
        ];

        foreach ($categories as $category) {
            Category::updateOrCreate(
                ['slug' => $category['slug']],
                $category
            );
        }
    }
}