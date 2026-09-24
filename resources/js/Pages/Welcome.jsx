import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth = {} }) {
    return (
        <>
            <Head title="Temetőkezelő rendszer" />

            <div className="min-h-screen overflow-hidden bg-slate-950 text-white">
                {/* Background */}
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-emerald-900/20 blur-3xl" />
                    <div className="absolute -bottom-40 -right-40 h-[600px] w-[600px] rounded-full bg-slate-700/20 blur-3xl" />

                    <div
                        className="absolute inset-0 opacity-[0.035]"
                        style={{
                            backgroundImage:
                                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />
                </div>

                <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl flex-col px-6 lg:px-8">
                    {/* Header */}
                    <header className="flex items-center justify-between py-6">
                        <Link
                            href="/"
                            className="flex items-center gap-3"
                        >
                            <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-emerald-400/20 bg-emerald-400/10">
                                <svg
                                    className="h-6 w-6 text-emerald-400"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 21V9m0 0c-2.5-2.5-5.5-3.5-8-3.5M12 9c2.5-2.5 5.5-3.5 8-3.5M5 21h14M7 21V9.5M17 21V9.5M4 9.5h16M8 5.5c0-1.1.9-2 2-2h4c1.1 0 2 .9 2 2"
                                    />
                                </svg>
                            </div>

                            <div>
                                <div className="text-sm font-semibold tracking-wide text-white">
                                    Temető App
                                </div>
                                <div className="text-xs text-slate-500">
                                    Temetőkezelő rendszer
                                </div>
                            </div>
                        </Link>

                        <nav className="flex items-center gap-2">
                            {auth?.user ? (
                                <Link
                                    href={route('dashboard')}
                                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 backdrop-blur transition hover:border-emerald-400/30 hover:bg-white/10 hover:text-white"
                                >
                                    Vezérlőpúlt
                                </Link>
                            ) : (
                                <Link
                                    href={route('login')}
                                    className="rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-slate-200 backdrop-blur transition hover:border-emerald-400/30 hover:bg-white/10 hover:text-white"
                                >
                                    Bejelentkezés
                                </Link>
                            )}
                        </nav>
                    </header>

                    {/* Hero */}
                    <main className="flex flex-1 items-center py-16 lg:py-24">
                        <div className="grid w-full items-center gap-16 lg:grid-cols-2 lg:gap-24">
                            {/* Left */}
                            <div>
                                <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3.5 py-2 text-sm text-emerald-300">
                                    <span className="relative flex h-2 w-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-50" />
                                        <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
                                    </span>
                                    Modern temetőnyilvántartás
                                </div>

                                <h1 className="max-w-3xl text-5xl font-semibold leading-[1.08] tracking-tight text-white sm:text-6xl lg:text-7xl">
                                    Rendezett nyilvántartás.
                                    <span className="block text-emerald-400">
                                        Méltó gondoskodás.
                                    </span>
                                </h1>

                                <p className="mt-7 max-w-xl text-lg leading-8 text-slate-400">
                                    Egy átlátható rendszer a temetői
                                    parcellák, sírhelyek, elhunytak és
                                    kapcsolódó nyilvántartások egyszerű
                                    kezeléséhez.
                                </p>

                                <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                                    {auth?.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400"
                                        >
                                            Vezérlőpult megnyitása
                                            <svg
                                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 12h14m-6-6 6 6-6 6"
                                                />
                                            </svg>
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('login')}
                                            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3.5 text-sm font-semibold text-slate-950 shadow-lg shadow-emerald-500/10 transition hover:bg-emerald-400"
                                        >
                                            Belépés a rendszerbe
                                            <svg
                                                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M5 12h14m-6-6 6 6-6 6"
                                                />
                                            </svg>
                                        </Link>
                                    )}

                                    <a
                                        href="#funkciok"
                                        className="inline-flex items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-slate-300 transition hover:bg-white/[0.07] hover:text-white"
                                    >
                                        Funkciók megtekintése
                                    </a>
                                </div>

                                <div className="mt-10 flex items-center gap-6 text-sm text-slate-500">
                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="h-4 w-4 text-emerald-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        Átlátható
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="h-4 w-4 text-emerald-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        Biztonságos
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <svg
                                            className="h-4 w-4 text-emerald-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M5 13l4 4L19 7"
                                            />
                                        </svg>
                                        Modern
                                    </div>
                                </div>
                            </div>

                            {/* Right - Dashboard Preview */}
                            <div className="relative">
                                <div className="absolute -inset-10 rounded-full bg-emerald-500/5 blur-3xl" />

                                <div className="relative rounded-2xl border border-white/10 bg-slate-900/80 p-3 shadow-2xl shadow-black/30 backdrop-blur-xl">
                                    {/* Browser header */}
                                    <div className="flex items-center gap-2 border-b border-white/5 px-3 pb-3">
                                        <div className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
                                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />

                                        <div className="ml-3 h-7 flex-1 rounded-lg bg-white/[0.03]" />
                                    </div>

                                    {/* Fake dashboard */}
                                    <div className="grid grid-cols-[90px_1fr] gap-4 p-4">
                                        <div className="space-y-3">
                                            <div className="mx-auto mb-6 flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-400/10">
                                                <svg
                                                    className="h-5 w-5 text-emerald-400"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke="currentColor"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M12 21V9m0 0c-2.5-2.5-5.5-3.5-8-3.5M12 9c2.5-2.5 5.5-3.5 8-3.5M5 21h14"
                                                    />
                                                </svg>
                                            </div>

                                            {[1, 2, 3, 4, 5].map((item) => (
                                                <div
                                                    key={item}
                                                    className={`h-8 rounded-lg ${
                                                        item === 1
                                                            ? 'bg-emerald-400/10'
                                                            : 'bg-white/[0.025]'
                                                    }`}
                                                />
                                            ))}
                                        </div>

                                        <div>
                                            <div className="mb-5 flex items-center justify-between">
                                                <div>
                                                    <div className="text-sm font-semibold text-white">
                                                        Áttekintés
                                                    </div>
                                                    <div className="mt-1 text-[10px] text-slate-500">
                                                        Temetői nyilvántartás
                                                    </div>
                                                </div>

                                                <div className="h-8 w-20 rounded-lg bg-emerald-400/10" />
                                            </div>

                                            <div className="grid grid-cols-3 gap-3">
                                                {[
                                                    ['Parcellák', '24'],
                                                    ['Sírhelyek', '1 248'],
                                                    ['Nyilvántartott', '982'],
                                                ].map(([label, value]) => (
                                                    <div
                                                        key={label}
                                                        className="rounded-xl border border-white/5 bg-white/[0.025] p-3"
                                                    >
                                                        <div className="text-[9px] text-slate-500">
                                                            {label}
                                                        </div>
                                                        <div className="mt-2 text-lg font-semibold text-white">
                                                            {value}
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                            <div className="mt-4 rounded-xl border border-white/5 bg-white/[0.025] p-4">
                                                <div className="mb-4 flex items-center justify-between">
                                                    <div className="text-xs font-medium text-slate-300">
                                                        Sírhelyek áttekintése
                                                    </div>
                                                    <div className="text-[9px] text-slate-600">
                                                        2026
                                                    </div>
                                                </div>

                                                <div className="flex h-32 items-end gap-2">
                                                    {[35, 55, 45, 75, 62, 88, 70, 94, 78, 100, 84, 92].map(
                                                        (height, index) => (
                                                            <div
                                                                key={index}
                                                                className="flex-1 rounded-t bg-emerald-400/20"
                                                                style={{
                                                                    height: `${height}%`,
                                                                }}
                                                            />
                                                        ),
                                                    )}
                                                </div>
                                            </div>

                                            <div className="mt-4 grid grid-cols-2 gap-3">
                                                <div className="rounded-xl border border-white/5 bg-white/[0.025] p-3">
                                                    <div className="mb-3 h-2 w-20 rounded bg-white/10" />
                                                    <div className="h-2 w-full rounded bg-white/5" />
                                                    <div className="mt-2 h-2 w-3/4 rounded bg-white/5" />
                                                </div>

                                                <div className="rounded-xl border border-white/5 bg-white/[0.025] p-3">
                                                    <div className="mb-3 h-2 w-16 rounded bg-white/10" />
                                                    <div className="h-2 w-full rounded bg-white/5" />
                                                    <div className="mt-2 h-2 w-2/3 rounded bg-white/5" />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </main>

                    {/* Features */}
                    <section
                        id="funkciok"
                        className="border-t border-white/5 py-16"
                    >
                        <div className="grid gap-4 md:grid-cols-3">
                            {[
                                {
                                    number: '1',
                                    title: 'Sírhelyek kezelése',
                                    text: 'Parcellák és sírhelyek strukturált, könnyen kereshető nyilvántartása.',
                                },
                                {
                                    number: '2',
                                    title: 'Elhunytak nyilvántartása',
                                    text: 'Az adatok egy helyen, gyorsan elérhető és áttekinthető formában.',
                                },
                                {
                                    number: '3',
                                    title: 'Térképes áttekintés',
                                    text: 'A temető struktúrájának vizuális kezelése és a sírhelyek egyszerű azonosítása.',
                                },
                            ].map((feature) => (
                                <div
                                    key={feature.number}
                                    className="group rounded-2xl border border-white/5 bg-white/[0.02] p-6 transition hover:border-emerald-400/20 hover:bg-white/[0.035]"
                                >
                                    <div className="mb-8 text-xs font-medium tracking-widest text-emerald-400">
                                        {feature.number}
                                    </div>

                                    <h3 className="text-lg font-semibold text-white">
                                        {feature.title}
                                    </h3>

                                    <p className="mt-3 text-sm leading-6 text-slate-500">
                                        {feature.text}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Footer */}
                    <footer className="flex flex-col gap-3 border-t border-white/5 py-8 text-xs text-slate-600 sm:flex-row sm:items-center sm:justify-between">
                        <span>
                            © {new Date().getFullYear()} Temető App
                        </span>

                        <span>
                            Temetőkezelő rendszer
                        </span>
                    </footer>
                </div>
            </div>
        </>
    );
}
