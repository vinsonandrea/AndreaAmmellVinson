<?php
namespace App\Services;
use illuminate\Pagination\LengthAwarePaginator;

class SubscriberService

{
    public function paginate($query, $perPage = 10, $page = null, $options = [])
    {
        $page = $page ?: (LengthAwarePaginator::resolveCurrentPage() ?: 1);
        $total = $query->count();
        $results = $query->forPage($page, $perPage)->get();
        return new LengthAwarePaginator($results, $total, $perPage, $page, $options);

        
    }   
}

