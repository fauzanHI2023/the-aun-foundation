<?php

namespace App\Http\Controllers;

use App\Models\Campaign;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    public function index()
    {
        $cart = session()->get('cart', []);

        $grandTotal = collect($cart)->sum('subtotal');

        return Inertia::render('Cart/Index', [
            'cart' => array_values($cart),
            'grandTotal' => $grandTotal,
        ]);
    }

    public function add(Request $request)
    {
        $request->validate([
            'campaign_id' => 'required|exists:campaigns,id',
            'amount' => 'required|numeric|min:1000',
        ]);

        $campaign = Campaign::findOrFail(
            $request->campaign_id
        );

        $cart = session()->get('cart', []);

        $campaignId = $campaign->id;

        /*
        overwrite jika sudah ada
        */
        $cart[$campaignId] = [
            'campaign_id' => $campaign->id,

            'title' => $campaign->title,

            'slug' => $campaign->slug,

            'thumbnail' => $campaign->thumbnail,

            'amount' => (int) $request->amount,

            'qty' => 1,

            'subtotal' => (int) $request->amount,
        ];

        session()->put('cart', $cart);

        return redirect()
            ->back()
            ->with(
                'success',
                'Campaign berhasil ditambahkan ke cart'
            );
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'amount' => 'required|numeric|min:1000',
        ]);

        $cart = session()->get('cart', []);

        if (!isset($cart[$id])) {

            return redirect()
                ->back()
                ->with(
                    'error',
                    'Item tidak ditemukan'
                );
        }

        $cart[$id]['amount'] = (int) $request->amount;

        $cart[$id]['subtotal'] = (int) $request->amount;

        session()->put('cart', $cart);

        return redirect()
            ->back()
            ->with(
                'success',
                'Cart berhasil diupdate'
            );
    }

    public function remove($id)
    {
        $cart = session()->get('cart', []);

        if (isset($cart[$id])) {

            unset($cart[$id]);

            session()->put('cart', $cart);
        }

        return redirect()
            ->back()
            ->with(
                'success',
                'Item berhasil dihapus'
            );
    }

    public function clear()
    {
        session()->forget('cart');

        return redirect()
            ->back()
            ->with(
                'success',
                'Cart berhasil dikosongkan'
            );
    }
}
