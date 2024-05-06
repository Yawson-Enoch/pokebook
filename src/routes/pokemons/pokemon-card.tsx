import { Button } from '@/components/ui/button';
import { Icons } from '@/components/common/icons';

export default function PokemonCard() {
  return (
    <li
      className="relative grid cursor-pointer justify-items-center gap-y-8 rounded-[20px] bg-background p-2.5 shadow-[0_4px_40px_0_hsl(0_0%_0%_/_.06)]"
      onClick={() => console.log('open drawer')}
    >
      <div className="grid justify-items-center gap-y-2">
        {/* image */}
        <div className="flex h-[148px] w-[268px] items-center justify-center rounded-[15px] bg-[#F1F1F1]">
          <img
            className="relative -top-11 size-full object-contain"
            src={'/assets/images/logo.webp'}
            /* add pokemon name here */
            alt="Pokebook logo"
          />
        </div>
        {/* title */}
        <p className="text-2xl font-medium">beedrill</p>
        {/* types */}
        <ul className="flex items-center justify-center gap-x-2.5">
          {['normal', 'poison'].map((title) => (
            <li
              key={title}
              className="flex items-center justify-center gap-x-0.5 rounded-full bg-[#EEEEEE] px-[12px] py-[4px] font-sans capitalize"
            >
              <span>🔥</span>
              {title}
            </li>
          ))}
        </ul>
      </div>

      <Button className="flex w-full justify-between px-[20px] py-[12px]">
        <span>View Pokemon</span>
        <Icons.EyeIcon />
      </Button>
    </li>
  );
}
