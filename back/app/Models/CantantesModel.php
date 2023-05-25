<?php

namespace App\Models;

use CodeIgniter\Model;

class CantantesModel extends Model
{
   
    protected $table = "cantantes";
    protected $primaryKey = 'id';
    protected $allowedFields = ['nombre','apellido','nacimiento','Biografia'];


}
