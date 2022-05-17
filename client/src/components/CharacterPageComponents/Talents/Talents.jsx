import { v4 as uuid } from 'uuid';

const Talents = ({ talents, equipment }) => {
    return (
        <section>
            {(talents && equipment) !== null && (
                <div>
                    <div>
                        <h3>Talents</h3>
                    </div>
                    <div style={{ display: 'flex' }}>
                        {talents.map((item, index) => (
                            <div key={uuid()}>
                                <a href="#" data-wowhead={`spell=${item.spell_tooltip.spell.id}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.talents[index].icon}.jpg`}></img></a>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default Talents;