import { Reveal } from './Reveal';
import { LeafDivider } from '../ornaments/Ornament';

interface Props {
  title: string;
  id?: string;
  /** فاصل ذهبي أسفل اللوحة */
  divider?: boolean;
}

/**
 * لوحة عنوان: لوحة عاجية أفقية محفورة، والعنوان منقوش بالذهب داخل
 * قلبها. اللوحة تنكشف من خلف قناع والفاصل يُرسم من المركز،
 * فلا يتكرّر الظهور نفسه في كل قسم.
 */
export function SectionHeading({ title, id, divider = true }: Props) {
  return (
    <div style={{ textAlign: 'center' }}>
      {/* القوس يظهر أولًا ثمّ ينكشف العنوان من خلفه — والغلاف القاصّ
          يحيط بالعنوان وحده حتى لا يُقصّ فيض القوس خارج اللوحة. */}
      <Reveal kind="bloom" duration={1} className="plaque">
        <span aria-hidden="true" className="plaque__arch" />
        <Reveal kind="carve" delay={0.2} duration={0.9} className="plaque__mask">
          <h2 id={id} className="plaque__title brass-text">
            {title}
          </h2>
        </Reveal>
      </Reveal>

      {divider && (
        <Reveal kind="draw" delay={0.22} duration={0.9} style={{ display: 'flex', justifyContent: 'center' }}>
          <LeafDivider width={230} />
        </Reveal>
      )}
    </div>
  );
}
