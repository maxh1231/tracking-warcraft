import { v4 as uuid } from 'uuid';

const Gear = ({ equipment }) => {

    const paramArr = ['head', 'neck', 'shoulder', 'back', 'chest', 'wrist', 'hands', 'waist', 'legs', 'feet', 'finger1', 'finger2', 'trinket1', 'trinket2', 'mainhand', 'offhand'];

    const paramAdder = (type) => {
        if (type === 'offhand') {
            if (equipment.gear.items[type] === undefined) {
                return;
            };
        };
        let bonusStr = '';
        let gemStr = '';
        let enchantStr = '';

        if (equipment.gear.items[type].bonuses.length > 0) {
            bonusStr = equipment.gear.items[type].bonuses.join(':');
        };

        if (equipment.gear.items[type].gems.length > 0) {
            gemStr = equipment.gear.items[type].gems[0];
        };

        if (equipment.gear.items[type].enchant !== undefined) {
            enchantStr = equipment.gear.items[type].enchant;
        };

        // console.log({bonusStr: bonusStr, gemStr: gemStr, enchantStr: enchantStr});

        return <a href="#" data-wowhead={`item=${equipment.gear.items[type].item_id}&ilvl=${equipment.gear.items[type].item_level}&bonus=${bonusStr}&gems=${gemStr}&ench=${enchantStr}`}><img src={`https://wow.zamimg.com/images/wow/icons/medium/${equipment.gear.items[type].icon}.jpg`}></img></a>
    };

    return (
        <section>
            {equipment !== null && (
                <div>

                    <div style={{ display: 'flex' }}>
                        {paramArr.map((param) => (
                            <div key={uuid()}>
                                {paramAdder(param)}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </section>
    )
}

export default Gear;