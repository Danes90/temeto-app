import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';

export default function CreateCemetery({ className = '' }) {
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
        city: '',
        address: '',
        description: '',
    });

    const createUser = (e) => {
        e.preventDefault();

        post(route('admin.cemetery.store'), {
            preserveScroll: true,
            onSuccess: () => reset(),
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                    Temető
                </h2>
            }
        >
            <Head title="Temető létrehozása" />

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                     <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Temető létrehozása
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Új Temető létrehozása
                </p>
            </header>

            <form onSubmit={createUser} className="mt-6 space-y-6">
                {/* Name */}
                <div>
                    <InputLabel
                        htmlFor="name"
                        value="Név"
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

                <div>
                    <InputLabel
                        htmlFor="city"
                        value="Település"
                    />

                    <TextInput
                        id="city"
                        value={data.city}
                        onChange={(e) =>
                            setData('city', e.target.value)
                        }
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="city"
                        required
                    />

                    <InputError
                        message={errors.city}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="address"
                        value="Cím"
                    />

                    <TextInput
                        id="address"
                        value={data.address}
                        onChange={(e) =>
                            setData('address', e.target.value)
                        }
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="address"
                        required
                    />

                    <InputError
                        message={errors.address}
                        className="mt-2"
                    />
                </div>

                <div>
                    <InputLabel
                        htmlFor="description"
                        value="Leírás"
                    />

                    <TextInput
                        id="description"
                        value={data.description}
                        onChange={(e) =>
                            setData('description', e.target.value)
                        }
                        type="text"
                        className="mt-1 block w-full"
                        autoComplete="description"
                        required
                    />

                    <InputError
                        message={errors.description}
                        className="mt-2"
                    />
                </div>

                {/* Submit */}
                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        Temető létrehozása
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Temető létrehozva
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}