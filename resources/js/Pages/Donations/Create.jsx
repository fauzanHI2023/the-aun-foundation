import { useForm, Head } from "@inertiajs/react";
import DonationPanel from "@/Layouts/Donations/DonationPanel";
import DonorFormSection from "@/Layouts/Donations/Donorformsection";

export default function App({ paymentMethods }) {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone: "",
        amount: "",
        notes: "",
        payment_type: "",
        payment_channel: "",
    });

    function submit(e) {
        e.preventDefault();
        post(route("donations.store"));
    }

    return (
        <>
            <Head title="Donasi" />
            <form
                onSubmit={submit}
                className="w-full h-screen flex flex-col md:flex-row overflow-hidden"
            >
                <DonationPanel data={data} setData={setData} errors={errors} />
                <DonorFormSection
                    data={data}
                    setData={setData}
                    errors={errors}
                    processing={processing}
                    paymentMethods={paymentMethods}
                />
            </form>
        </>
    );
}
