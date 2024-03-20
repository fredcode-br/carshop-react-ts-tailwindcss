import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface Props {
    placeholder: string;
}

function PanelSearchBar({ placeholder }: Props) {
    return (
        <section className="flex justify-between bg-white w-full mt-8 p-5 rounded-md">
            <div className="relative flex items-center w-full">
                <MagnifyingGlassIcon className="h-5 w-5 absolute left-3 text-gray-400" />
                <input 
                    type="search" 
                    placeholder={placeholder} 
                    className="pl-10 py-1 w-full font-semibold focus:outline-none placeholder-gray-300" 
                />
            </div>
        </section>
    );
}

export default PanelSearchBar;
