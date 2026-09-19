import {
    FlaskConical,
    Palette,
    Layers3,
    Factory,
    Users,
} from "lucide-react";
import { motion } from "framer-motion";

export default function RnDExpertise() {
    const content = [
        {
            title: "Chemical Formulation",
            description:
                "Developing and refining dye formulations for different applications and performance requirements.",
            icon: FlaskConical,
            iconColor: "text-accent-red",
            image:
                "https://images.unsplash.com/photo-1591610217257-b3e8b1e99f98?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDV8fHxlbnwwfHx8fHw%3D",
        },
        {
            title: "Color Science",
            description:
                "Understanding shade development, color strength, consistency, and application requirements.",
            icon: Palette,
            iconColor: "text-accent-red",
            image:
                "https://images.unsplash.com/photo-1585751092218-cea84c1ecf01?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZHllJTIwdXNlc3xlbnwwfHwwfHx8MA%3D%3D",
        },
        {
            title: "Application Knowledge",
            description:
                "Using experience across textile, paper, leather, wood, and other sectors to develop practical solutions.",
            icon: Layers3,
            iconColor: "text-accent-red",
            image:
                "https://images.unsplash.com/photo-1589061935832-c4de192a2e8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTU4fHxkeWUlMjB1c2VzfGVufDB8fDB8fHww",
        },
        {
            title: "Production Integration",
            description:
                "Considering manufacturing requirements so successful formulations can transition smoothly into production.",
            icon: Factory,
            iconColor: "text-accent-red",
            image:
                "https://images.unsplash.com/photo-1569909115134-a0426936c879?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        },
        {
            title: "Customer Collaboration",
            description:
                "Working directly with customers to understand requirements and improve product solutions.",
            icon: Users,
            iconColor: "text-accent-red",
            image:
                "https://images.unsplash.com/photo-1648805700124-933fe337255e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y3VzdG9tZXIlMjBjb2xsYWJyYXRpb24lMjBjb2xvcmZ1bHxlbnwwfHwwfHx8MA%3D%3D",
        },
    ];

    return (
        <section className="relative bg-white py-14 sm:py-14 lg:py-16">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

                <motion.div 
                initial={{opacity:0 , y:30}}
                whileInView={{opacity:1 , y:0}}
                viewport={{once:true}}
                transition={{duration : 0.8}}
                className="max-w-4xl">
                    <div className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-primary">
                        <span className="h-0.5 w-10 bg-primary" />
                        Our Expertise
                    </div>

                    <h2 className="mt-3 text-2xl font-extrabold text-primary sm:text-4xl lg:text-5xl">
                        Experience That{" "}
                        <span className="text-accent-red">Drives Innovation</span>
                    </h2>

                    <p className="mt-5 text-base leading-7 text-slate-600 sm:text-lg">
                        Ambica Industry brings together dye manufacturing experience and
                        continuous formulation development to address the changing needs
                        of industrial customers.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 gap-4 py-12 md:grid-cols-[1.3fr_1fr_1fr_1fr_1.3fr] md:grid-rows-[250px_270px]">
                    {content.map((item, index) => {
                        const Icon = item.icon;
                        if (index === 0) {
                            return (
                                <div
                                    key={index}
                                    className="group relative flex flex-col overflow-hidden rounded-xl  shadow-md transition-all duration-700 hover:-translate-y-1 hover:shadow-lg md:col-span-1 md:row-span-2 shadow-black/50 pb-5"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-107"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/30 to-transparent" />
                                    <div className="relative mt-auto flex flex-col gap-4 p-5">
                                        <span className="w-13 h-13 bg-white/5 backdrop-blur-sm border border-white/20   flex items-center justify-center rounded-full  "><Icon className="h-6 w-6 text-white " /></span>
                                        <h3 className="text-xl font-bold text-white">{item.title}</h3>
                                        <p className="text-sm leading-6 text-white/85">{item.description}</p>
                                    </div>
                                </div>
                            );
                        }

                        if (index === 1) {
                            return (
                                <div
                                    key={index}
                                    className="flex flex-row overflow-hidden rounded-xl  bg-white shadow-sm transition-all duration-700 hover:-translate-y-1 group hover:shadow-lg md:col-span-3 shadow-black/40"
                                >
                                    <div className=" overflow-hidden md:h-full md:w-1/2">
                                        <img
                                            src={item.image}
                                            alt={item.title}
                                            className=" object-cover transition-transform duration-700 group-hover:scale-107"
                                        />
                                    </div>
                                    <div className="flex flex-1 flex-col justify-center gap-2 p-5">
                                        <Icon className={`h-7 w-7 ${item.iconColor}`} />
                                        <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                                        <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                                    </div>
                                </div>
                            );
                        }

                        if (index === 2) {
                            return (
                                <div
                                    key={index}
                                    className="group relative flex flex-col overflow-hidden rounded-xl shadow-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-lg shadow-black/40 md:col-span-1"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="absolute h-full w-full object-cover transition-transform duration-700 group-hover:scale-107"
                                    />
                                    <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/30 to-transparent" />

                                    <div className="relative mt-auto flex flex-col gap-2 p-5">
                                        <span className="w-13 h-13 bg-white/5 backdrop-blur-sm border border-white/20   flex items-center justify-center rounded-full  "><Icon className="h-6 w-6 text-white " /></span>
                                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                                        <p className="text-xs leading-5 text-white/85">{item.description}</p>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div
                                key={index}
                                className="group flex flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-lg md:col-span-2 md:flex-row"
                            >
                                <div className=" overflow-hidden md:h-full md:w-3/7">
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-107"
                                    />
                                </div>
                                <div className="flex flex-1 flex-col justify-center gap-2 p-5">
                                    <Icon className={`h-7 w-7 ${item.iconColor}`} />
                                    <h3 className="text-xl font-bold text-primary">{item.title}</h3>
                                    <p className="text-sm leading-6 text-slate-600">{item.description}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}