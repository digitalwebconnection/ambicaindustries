import {
    FlaskConical,
    Palette,
    Layers3,
    Factory,
    Users,
} from "lucide-react";
import { motion } from "framer-motion";
import imgFormulation from "../../../assets/images/rnd/rnd-formulation.jpg";
import imgColorScience from "../../../assets/images/rnd/rnd-color-science.jpg";
import imgApplication from "../../../assets/images/rnd/rnd-application.jpg";
import imgProduction from "../../../assets/images/rnd/rnd-production.jpg";
import imgCollaboration from "../../../assets/images/rnd/rnd-collaboration.jpg";

export default function RnDExpertise() {
    const content = [
        {
            title: "Chemical Formulation",
            description:
                "Developing and refining dye formulations for different applications and performance requirements.",
            icon: FlaskConical,
            iconColor: "text-accent-red",
            image: imgFormulation,
        },
        {
            title: "Color Science",
            description:
                "Understanding shade development, color strength, consistency, and application requirements.",
            icon: Palette,
            iconColor: "text-accent-red",
            image: imgColorScience,
        },
        {
            title: "Application Knowledge",
            description:
                "Using experience across textile, paper, leather, wood, and other sectors to develop practical solutions.",
            icon: Layers3,
            iconColor: "text-accent-red",
            image: imgApplication,
        },
        {
            title: "Production Integration",
            description:
                "Considering manufacturing requirements so successful formulations can transition smoothly into production.",
            icon: Factory,
            iconColor: "text-accent-red",
            image: imgProduction,
        },
        {
            title: "Customer Collaboration",
            description:
                "Working directly with customers to understand requirements and improve product solutions.",
            icon: Users,
            iconColor: "text-accent-red",
            image: imgCollaboration,
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
