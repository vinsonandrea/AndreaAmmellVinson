<?php

namespace App\Http\Controllers;

use App\Http\Requests\SubscriberRequest;
use App\Models\Subscriber;
use App\Services\SubscriberService;
use Inertia\Inertia;

class SubscriberController extends Controller
{
    public function __construct(private SubscriberService $service)
    {
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Inertia::render('subscribers/index', ['subscribers' => $this->service->getRecords()]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('subscribers/form', [
            'generatedAccount' => $this->service->nextAccountNumberPreview(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(SubscriberRequest $request)
    {
        $this->service->create($request->validated());

        return to_route('subscribers.index')->with('success', 'Subscriber created.');
    }

    /**
     * Display the specified resource.
     */
    public function show(Subscriber $subscriber)
    {
        return Inertia::render('subscribers/show', [
            'subscriber' => $this->service->find($subscriber->subscriber_account),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Subscriber $subscriber)
    {
        return Inertia::render('subscribers/form', [
            'subscriber' => $this->service->find($subscriber->subscriber_account),
            'generatedAccount' => $subscriber->subscriber_account,
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SubscriberRequest $request, Subscriber $subscriber)
    {
        $this->service->update($subscriber, $request->validated());

        return to_route('subscribers.index')->with('success', 'Subscriber updated.');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Subscriber $subscriber)
    {
        $this->service->delete($subscriber);

        return back()->with('success', 'Subscriber deleted.');
    }
}
