<?php

namespace App\Models;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
   use HasFactory;
protected $table = 'categorys'; 
   protected $fillable=[
    'id',
    'name',
    'description',
    'status',
    'slug',
    'parent_id',
    'level',
   ];
}
