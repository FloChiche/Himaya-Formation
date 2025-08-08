import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

export default function Welcome() {
    const { auth } = usePage<SharedData>().props;

    return (
        <>
            <Head title="Himaya">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>
            
            <div className="min-h-screen bg-gray-50">
                {/* Header */}
                <header className="bg-white shadow-sm border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-16">
                            {/* Logo */}
                            <div className="flex items-center">
                                <div className="bg-blue-500 text-white px-4 py-2 rounded-lg font-semibold text-lg border-2 border-blue-600">
                                    Himaya-formation.ma
                                </div>
                            </div>

                            {/* Contact Info */}
                            <div className="hidden md:flex items-center space-x-6 text-sm text-gray-600">
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <span>info@himaya.ma</span>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                    </svg>
                                    <span>(+212) 522-984-177</span>
                                </div>
                            </div>
                        </div>

                        {/* Navigation */}
                        <nav className="border-t border-gray-200">
                            <div className="flex items-center justify-between py-4">
                                {/* Navigation Links */}
                                <div className="flex items-center space-x-1">
                                    <Link
                                        href="/"
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors"
                                    >
                                        Accueil
                                    </Link>
                                    <Link
                                        href="/about"
                                        className="text-gray-600 hover:text-gray-900 px-6 py-2 rounded-full text-sm font-medium transition-colors hover:bg-gray-100"
                                    >
                                        Qui sommes nous
                                    </Link>
                                    <Link
                                        href="/formations"
                                        className="text-gray-600 hover:text-gray-900 px-6 py-2 rounded-full text-sm font-medium transition-colors hover:bg-gray-100"
                                    >
                                        Nos formations
                                    </Link>
                                    <Link
                                        href="/formateurs"
                                        className="text-gray-600 hover:text-gray-900 px-6 py-2 rounded-full text-sm font-medium transition-colors hover:bg-gray-100"
                                    >
                                        Nos formateurs
                                    </Link>
                                    <Link
                                        href="/safety-days"
                                        className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m-6 0h6m-6 0V7m6 0V7m-6 0H7a2 2 0 00-2 2v11a2 2 0 002 2h10a2 2 0 002-2V9a2 2 0 00-2-2h-1" />
                                        </svg>
                                        <span>Safety Days</span>
                                    </Link>
                                </div>

                                {/* Auth Links */}
                                <div className="flex items-center space-x-2">
                                    {auth.user ? (
                                        <Link
                                            href={route('dashboard')}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <span>Dashboard</span>
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('login')}
                                            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium transition-colors flex items-center space-x-2"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                                            </svg>
                                            <span>Connexion</span>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </nav>
                    </div>
                </header>

                {/* Mobile Menu Button (optional - for responsive design) */}
                <div className="md:hidden bg-white border-b border-gray-200 px-4 py-2">
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                            <div>info@himaya.ma</div>
                            <div>(+212) 522-984-177</div>
                        </div>
                    </div>
                </div>

                {/* Main Content Area */}
                <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    {/* Votre contenu principal ici */}
                    <div className="text-center">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            Bienvenue chez Himaya
                        </h1>
                        <p className="text-lg text-gray-600 mb-8">
                            Centre de formation professionnelle
                        </p>
                        
                        {/* Vous pouvez ajouter votre contenu ici */}
                    </div>
                </main>
            </div>
        </>
    );
}