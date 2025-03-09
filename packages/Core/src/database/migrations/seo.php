<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('seo_meta', function (Blueprint $table) {
            $table->id();
            $table->string('meta_title', 255)->nullable()->comment('Tiêu đề SEO');
            $table->text('meta_description')->nullable()->comment('Mô tả SEO');
            $table->string('meta_keywords', 500)->nullable()->comment('Từ khóa SEO, phân cách bằng dấu phẩy');
            $table->string('canonical_url')->nullable()->comment('URL chính tắc');

            // Open Graph (Facebook, Zalo, LinkedIn)
            $table->string('og_title', 255)->nullable()->comment('Tiêu đề Open Graph');
            $table->text('og_description')->nullable()->comment('Mô tả Open Graph');
            $table->string('og_image')->nullable()->comment('Hình ảnh Open Graph');
            $table->string('og_url')->nullable()->comment('URL Open Graph');
            $table->string('og_type')->default('website')->comment('Loại nội dung Open Graph');

            // Twitter Card
            $table->string('twitter_title', 255)->nullable()->comment('Tiêu đề Twitter Card');
            $table->text('twitter_description')->nullable()->comment('Mô tả Twitter Card');
            $table->string('twitter_image')->nullable()->comment('Hình ảnh Twitter Card');
            $table->string('twitter_card')->default('summary_large_image')->comment('Kiểu Twitter Card');

            // Schema.org (SEO nâng cao)
            $table->json('structured_data')->nullable()->comment('Dữ liệu JSON-LD Schema.org');

            // Liên kết với các bảng khác (Polymorphic)
            $table->morphs('seoable');

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('seo_meta');
    }
};
