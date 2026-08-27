<x-filament-panels::page>
    {{-- Live ticker, full width di paling atas --}}
    @livewire(\App\Filament\Widgets\LiveTickerWidget::class)

    <div class="folio-grid">
        {{-- ================= KIRI: kartu profil donatur ================= --}}
        <aside class="folio-col-left">
            <x-filament::section>
                <div class="folio-profile-header">
                    <div class="folio-avatar">{{ $this->getAdminInitial() }}</div>
                    <div>
                        <p class="folio-profile-name">{{ $this->getAdminName() }}</p>
                        <p class="folio-profile-handle fi-color-text-gray-500 dark:fi-color-text-gray-400">
                            {{ $this->getAdminHandle() }}
                        </p>
                    </div>
                </div>

                <p class="fi-color-text-gray-500 dark:fi-color-text-gray-400 text-xs uppercase tracking-wide">
                    Dana Terkumpul (Total)
                </p>
                <p class="folio-total">Rp {{ $this->getTotalCollected() }}</p>

                @php $change = $this->getMonthOverMonthChange(); @endphp
                <span class="folio-change {{ $change >= 0 ? 'is-up' : 'is-down' }}">
                    {{ $change >= 0 ? '▲' : '▼' }} {{ abs($change) }}% vs last month
                </span>

                <div class="folio-stat-grid">
                    <div class="folio-stat-box">
                        <p class="fi-color-text-gray-500 dark:fi-color-text-gray-400 text-xs uppercase tracking-wide">
                            Donatur
                        </p>
                        <p class="folio-stat-value">{{ $this->getDonorCount() }}</p>
                    </div>
                    <div class="folio-stat-box">
                        <p class="fi-color-text-gray-500 dark:fi-color-text-gray-400 text-xs uppercase tracking-wide">
                            Campaign
                        </p>
                        <p class="folio-stat-value">{{ $this->getCampaignCount() }}</p>
                    </div>
                </div>
            </x-filament::section>

            <x-filament::section>
                <x-slot name="heading">Metode Pembayaran Dominan</x-slot>

                <div class="folio-payment-list">
                    @foreach ($this->getPaymentMethods() as $method)
                        <div>
                            <div class="folio-payment-label">
                                <span>{{ $method['label'] }}</span>
                                <span class="folio-payment-percent">{{ number_format($method['percent'], 2) }}%</span>
                            </div>
                            <div class="folio-payment-track">
                                <div class="folio-payment-fill" style="width: {{ $method['percent'] }}%"></div>
                            </div>
                        </div>
                    @endforeach
                </div>
            </x-filament::section>

            <div class="folio-actions">
                <x-filament::button color="gray" outlined class="w-full">
                    Ekspor Laporan .PDF
                </x-filament::button>
                <x-filament::button
                    tag="a"
                    :href="\App\Filament\Resources\CampaignResource::getUrl('create')"
                    class="w-full"
                >
                    Buat Program Baru
                </x-filament::button>
            </div>
        </aside>

        {{-- ================= KANAN: area utama ================= --}}
        <div class="folio-col-main">
            <div class="folio-main-header">
                <div>
                    <h1 class="fi-header-heading">Dashboard Ikhtisar</h1>
                    <p class="fi-color-text-gray-500 dark:fi-color-text-gray-400">
                        Selamat datang kembali. Berikut ringkasan aktivitas hari ini.
                    </p>
                </div>
                <x-filament::badge color="gray" size="lg">
                    {{ now()->translatedFormat('d M, Y') }}
                </x-filament::badge>
            </div>

            @livewire(\App\Filament\Widgets\TransactionChartWidget::class)

            <h2 class="folio-section-title">Campaign Perlu Perhatian</h2>
            @livewire(\App\Filament\Widgets\CampaignAttentionWidget::class)

            <div class="folio-split">
                <div class="folio-split-main">
                    @livewire(\App\Filament\Widgets\RecentActivityWidget::class)
                </div>
                <div class="folio-split-side">
                    @livewire(\App\Filament\Widgets\ProgramUpdatesWidget::class)
                </div>
            </div>
        </div>
    </div>

    <style>
        /* Cuma atur POSISI/GRID — warna & font ikut tema panel default */

        .folio-grid {
            display: grid;
            grid-template-columns: 320px 1fr;
            gap: 1.5rem;
            margin-top: 1.5rem;
            align-items: start;
        }

        @media (max-width: 1024px) {
            .folio-grid {
                grid-template-columns: 1fr;
            }
        }

        .folio-col-left {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
        }

        .folio-profile-header {
            display: flex;
            align-items: center;
            gap: 0.75rem;
            margin-bottom: 1.5rem;
        }

        .folio-avatar {
            width: 44px;
            height: 44px;
            border-radius: 9999px;
            background: rgba(120, 120, 120, 0.15);
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: 600;
            flex-shrink: 0;
        }

        .folio-profile-name {
            font-weight: 600;
        }

        .folio-total {
            font-size: 1.75rem;
            font-weight: 600;
            margin: 0.25rem 0 0.5rem;
        }

        .folio-change {
            display: inline-block;
            font-size: 0.75rem;
            font-weight: 600;
            padding: 0.125rem 0.5rem;
            border-radius: 0.25rem;
        }
        .folio-change.is-up {
            color: rgb(5, 150, 105);
            background: rgba(5, 150, 105, 0.1);
        }
        .folio-change.is-down {
            color: rgb(220, 38, 38);
            background: rgba(220, 38, 38, 0.1);
        }

        .folio-stat-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 0.75rem;
            margin-top: 1.5rem;
        }

        .folio-stat-box {
            border: 1px solid rgba(120, 120, 120, 0.2);
            border-radius: 0.5rem;
            padding: 0.75rem 0.875rem;
        }

        .folio-stat-value {
            font-size: 1.25rem;
            font-weight: 600;
            margin-top: 0.25rem;
        }

        .folio-payment-list {
            display: flex;
            flex-direction: column;
            gap: 1rem;
        }

        .folio-payment-label {
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 0.75rem;
            margin-bottom: 0.375rem;
        }

        .folio-payment-track {
            width: 100%;
            height: 4px;
            border-radius: 9999px;
            overflow: hidden;
            background: rgba(120, 120, 120, 0.15);
        }

        .folio-payment-fill {
            height: 100%;
            border-radius: 9999px;
            background: currentColor;
        }

        .folio-actions {
            display: flex;
            flex-direction: column;
            gap: 0.75rem;
        }

        .folio-main-header {
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            margin-bottom: 1.5rem;
            flex-wrap: wrap;
            gap: 1rem;
        }

        .folio-section-title {
            font-size: 1.125rem;
            font-weight: 600;
            margin: 2rem 0 1rem;
        }

        .folio-split {
            display: grid;
            grid-template-columns: 2fr 1fr;
            gap: 1.5rem;
            margin-top: 1.5rem;
        }

        @media (max-width: 768px) {
            .folio-split {
                grid-template-columns: 1fr;
            }
        }
    </style>
</x-filament-panels::page>