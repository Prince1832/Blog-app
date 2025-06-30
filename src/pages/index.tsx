import React from 'react'
import Link from 'next/link'

export default function Home() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-teal-100 via-blue-100 to-cyan-100 flex items-center justify-center px-4">

            <div className="bg-white shadow-xl rounded-2xl p-8 max-w-xl w-full text-center flex flex-col items-center gap-2">
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Blog App
                </h1>
                <p className="text-gray-600 md:text-lg mb-6 text-md">
                    Welcome to a minimal and powerful blogging platform
                </p>
                <Link
                    href="/admin"
                    className="w-fit text-sm sm:text-base inline-block bg-gradient-to-r from-blue-500 to-teal-400 hover:from-blue-600 hover:to-teal-500 transition-all text-white font-semibold py-2 px-6 rounded-lg shadow-lg"
                >
                    Go to Admin Dashboard
                </Link>

            </div>
        </div>
    )
}
