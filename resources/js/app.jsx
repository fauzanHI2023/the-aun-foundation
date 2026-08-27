import "../css/app.css";
import "./bootstrap";
// import "@fontsource/poppins/400.css";
// import "@fontsource/poppins/500.css";
// import "@fontsource/poppins/600.css";
// import "@fontsource/poppins/700.css";
import "@fontsource/nunito/400.css";
import "@fontsource/nunito/500.css";
import "@fontsource/nunito/600.css";
import "@fontsource/nunito/700.css";

import "@fontsource/rethink-sans/400.css";
import "@fontsource/rethink-sans/500.css";
import "@fontsource/rethink-sans/600.css";
import "@fontsource/rethink-sans/700.css";
import "@fontsource/fraunces/400.css";
import "@fontsource/fraunces/500.css";
import "@fontsource/fraunces/600.css";
import "@fontsource/fraunces/700.css";

// import "@fontsource/quintessential/400.css";
// import "@fontsource/quintessential/500.css";
// import "@fontsource/quintessential/600.css";
// import "@fontsource/quintessential/700.css";
// import "@fontsource/eb-garamond/400.css";
// import "@fontsource/eb-garamond/500.css";
// import "@fontsource/eb-garamond/600.css";
// import "@fontsource/eb-garamond/700.css";

import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { createRoot } from "react-dom/client";
import MainLayout from "./Layouts/MainLayout";

const appName = import.meta.env.VITE_APP_NAME || "Laravel";

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];

        // halaman yang sudah wrap layout manual (Breeze) tidak perlu fallback
        const selfWrapped = ["Dashboard", "Profile/Edit"];

        if (!page.default.layout && !selfWrapped.includes(name)) {
            page.default.layout = (p) => <MainLayout>{p}</MainLayout>;
        }

        return page;
    },
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(<App {...props} />);
    },
    progress: { color: "#4B5563" },
});
