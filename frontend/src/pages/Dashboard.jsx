import { useAuth } from '../contexts/AuthContext';

const Dashboard = () => {
    const { user, logout } = useAuth();

    const handleLogout = async () => {
        await logout();
    };

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex">
                            <div className="flex-shrink-0 flex items-center">
                                <h1 className="text-xl font-bold text-indigo-600">LearnHub</h1>
                            </div>
                        </div>
                        <div className="flex items-center">
                            <div className="mr-4">
                                <span className="text-gray-700">Welcome, {user?.name}</span>
                                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                                    {user?.role}
                                </span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="py-10">
                <header>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold leading-tight text-gray-900">Dashboard</h1>
                    </div>
                </header>
                <main>
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        {/* Dashboard content will go here */}
                        <div className="bg-white shadow overflow-hidden sm:rounded-lg mt-5 p-6">
                            <p className="text-gray-700">You are logged in as {user?.role}.</p>
                            <p className="text-gray-700 mt-2">This is your dashboard. Content will vary based on your role.</p>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
