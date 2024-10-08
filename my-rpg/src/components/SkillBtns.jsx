import { useContext } from "react";
import { AppContext } from "../App";

let cooldown = 0;

const SkillBtns = () => {
	const {
		playerStats,
		setPlayerStats,
		monsterStats,
		setMonsterStats,
		playerTurn,
		setPlayerTurn,
		stunned,
		setStunned,
	} = useContext(AppContext);

	const monsterTurn = () => {
		if (stunned) {
			setPlayerTurn(true);
		} else {
			setPlayerStats({
				...playerStats,
				health: playerStats.health - (monsterStats.attack - playerStats.armor),
			});
			setPlayerTurn(true);
		}
	};

	const handleSkill = (e) => {
		switch (e.target.textContent) {
			case "Attack":
				setMonsterStats({
					...monsterStats,
					health:
						monsterStats.health - (playerStats.attack - monsterStats.armor),
				});
				setStunned(false);
				if (cooldown > 0) {
					cooldown -= 1;
				}
				break;
			case "Shield Bash":
				setMonsterStats({
					...monsterStats,
					health: monsterStats.health - (3 - monsterStats.armor),
				});
				setStunned(true);
				cooldown = 2;
				break;
			case "Smoke Bomb":
				setMonsterStats({
					...monsterStats,
					health: monsterStats.health - (3 - monsterStats.armor),
					stunned: true,
				});
				cooldown = 2;
				break;
			case "Ice Shard":
				setMonsterStats({
					...monsterStats,
					health: monsterStats.health - (3 - monsterStats.armor),
					stunned: true,
				});
				cooldown = 2;
				break;
		}
		setPlayerTurn(!playerTurn);
		setTimeout(() => {
			monsterTurn();
		}, 1500);
	};

	return (
		<div className="skill-btns">
			<button
				className="attack-btn"
				disabled={!playerTurn}
				onClick={handleSkill}
			>
				{playerStats.skills[0]}
			</button>
			<button
				className={`skill-btn ${playerStats.title.toLowerCase()}`}
				disabled={cooldown > 0}
				onClick={handleSkill}
			>
				{playerStats.skills[1]}
			</button>
		</div>
	);
};

export default SkillBtns;
