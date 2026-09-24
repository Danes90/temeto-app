import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function CreateUserForm({ className = '' }) {
    const {
        data,
        setData,
        errors,
        post,
        reset,
        processing,
        recentlySuccessful,
    } = useForm({
        name: '',
        email: '',
        password: '',
        role: 'editor',
    });

    const createUser = (e) => {
        e.preventDefault();

        post(route('admin.user.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Profil oldal
                </h2>
            }
        >
            <Head title="Profile" />
            <div className="py-12">
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Create User
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Create a new user account and assign a role.
                </p>
            </header>

            <form onSubmit={createUser} className="mt-6 space-y-6">
                {/* Name */}
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Name"
                    />

                    <TextInput
                        id="name"
                        value={data.name}
                        onChange={(e) =>
                            setData('name', e.target.value)
                        }
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="name"
                        required
                    />

                    <InputError
                        message={errors.name}
                        className="mt-2"
                    />
                </div>

                {/* Email */}
                <div>
                    <InputLabel
                        htmlFor="email"
                        value="Email"
                    />

                    <TextInput
                        id="email"
                        value={data.email}
                        onChange={(e) =>
                            setData('email', e.target.value)
                        }
                        type="email"
                        className="mt-1 block w-full"
                        autoComplete="email"
                        required
                    />

                    <InputError
                        message={errors.email}
                        className="mt-2"
                    />
                </div>

                {/* Password */}
                <div>
                    <InputLabel
                        htmlFor="password"
                        value="Password"
                    />

                    <TextInput
                        id="password"
                        value={data.password}
                        onChange={(e) =>
                            setData('password', e.target.value)
                        }
                        type="password"
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        required
                    />

                    <InputError
                        message={errors.password}
                        className="mt-2"
                    />
                </div>

                {/* Role */}
                <div>
                    <InputLabel
                        htmlFor="role"
                        value="Role"
                    />

                    <select
                        id="role"
                        value={data.role}
                        onChange={(e) =>
                            setData('role', e.target.value)
                        }
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    >
                        <option value="editor">Editor</option>
                        <option value="admin">Admin</option>
                        <option value="super_admin">Super Admin</option>
                    </select>

                    <InputError
                        message={errors.role}
                        className="mt-2"
                    />
                </div>

                {/* Submit */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Create User
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            User created.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
         </div>
        </AuthenticatedLayout>
    );
}