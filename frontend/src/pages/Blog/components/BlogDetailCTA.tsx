import { Link } from 'react-router-dom';

export default function BlogDetailCTA() {
  return (
    <div className="rounded-3xl bg-linear-to-r from-slate-900 via-primary-dark to-slate-900 p-8 text-white text-center sm:text-left sm:flex sm:items-center sm:justify-between gap-6 shadow-xl border border-slate-800">
      <div>
        <h3 className="text-xl sm:text-2xl font-bold mb-2 text-white">
          Have specific technical dyeing requirements?
        </h3>
        <p className="text-slate-300 text-xs sm:text-sm max-w-xl">
          Request custom lab samples, spectrophotometric matching, or technical consultation with our chemical engineering team.
        </p>
      </div>
      <Link
        to="/enquiry"
        className="mt-4 sm:mt-0 shrink-0 inline-flex items-center justify-center px-6 py-3 rounded-full bg-accent-red hover:bg-accent-red-dark text-white font-semibold text-xs tracking-wide transition-all shadow-md shadow-accent-red/30 cursor-pointer"
      >
        Request Lab Samples
      </Link>
    </div>
  );
}
