import React from "react";
import TabHelper from "./TabHelper";
import PokemonAbilities from "./PokemonAbilities";
import PokeWRI from "./PokeWRI";
import PokemonForms from "./PokemonForms";
import PokemonEvolution from "./PokemonEvolution";
import { HorizontalBar } from "react-chartjs-2";
import TabWrapper from "./TabWrapper";
import { setChartData } from "../action";
import { connect } from "react-redux";

class PokemonTabs extends React.Component {
  componentDidMount = () => {
    console.log(
      "We are inside pokemon tabs, what is the value of tabs",
      this.props.tabs
    );
    const { poke } = this.props.tabs[0];
    const stats = poke.stats.map((stat) => stat.base_stat);

    this.props.setChartData({
      labels: ["HP", "Attack", "Defense", "Sp.Atk", "Sp.Def", "Speed"],
      datasets: [
        {
          label: "Pokemon Stats",
          backgroundColor: [
            "lightgreen",
            "lightcoral",
            "rgb(255, 198, 94)",
            "rgb(204, 153, 204)",
            "rgb(178, 178, 255)",
            "lightcoral",
          ],
          borderColor: [
            "lightgreen",
            "lightcoral",
            "rgb(255, 198, 94)",
            "rgb(204, 153, 204)",
            "rgb(178, 178, 255)",
            "lightcoral",
          ],
          borderWidth: 1,
          hoverBackgroundColor: [
            "#0f9b0f",
            "rgba(253, 7, 1, 1)",
            "rgba(255, 165, 0, 1)",
            "rgba(198, 25, 255, 0.5)",
            "rgba(0, 0, 153, 0.5)",
            "rgba(253, 7, 1, 1)",
          ],
          hoverBorderColor: "rgba(255,99,132,1)",
          data: stats,
        },
      ],
    });
  };

  getHighestStat = () => {
    const { poke } = this.props.tabs[0];
    const stats = poke.stats.map((stat) => stat.base_stat);

    const highestStat = Math.max(...stats);
    let maxTick = 0;

    if (highestStat >= 200) {
      maxTick = 260;
    } else if (highestStat >= 150) {
      maxTick = 200;
    } else if (highestStat >= 120) {
      maxTick = 150;
    } else {
      maxTick = 120;
    }
    return { highestStat, maxTick };
  };

  getPanes = () => {
    const { poke, flavor, genera, species } = this.props.tabs[0];
    console.log("pokemon data", this.props.tabs);
    const { maxTick } = this.getHighestStat();

    return [
      {
        menuItem: "About",
        render: () => (
          <TabHelper isAttached={true}>
            <div className={`ui segment biography`}>{flavor}</div>
            <div className={`ui segment`}>
              <div className={`ui about_items items`}>
                <div className={`about_item item`}>
                  <h3>Height</h3>
                  <span>{poke.height / 10} m</span>
                </div>
                <div className={`about_item item`}>
                  <h3>Weight</h3>
                  <span>{poke.weight} kg</span>
                </div>
                <div className={`about_item item`}>
                  <h3>Genus</h3>
                  <span>{genera}</span>
                </div>
                <div className={`about_item item`}>
                  <h3>Sprite</h3>
                  <span>
                    <img
                      src={poke.sprites["front_default"]}
                      alt={poke.name}
                    ></img>
                  </span>
                </div>
              </div>
            </div>
            <PokemonAbilities pokemon={poke}></PokemonAbilities>
            <PokeWRI poke={poke} headerText="R"></PokeWRI>
            <PokeWRI poke={poke} headerText="W"></PokeWRI>
            <PokeWRI poke={poke} headerText="I"></PokeWRI>
          </TabHelper>
        ),
      },
      {
        menuItem: "Stats",
        render: () => (
          <>
            <TabHelper isAttached={false}>
              <div style={{ maxWidth: "700px", margin: "0 auto" }}>
                <HorizontalBar
                  data={this.props.chart}
                  width={100}
                  height={60}
                  options={{
                    responsive: true,
                    scales: {
                      xAxes: [
                        {
                          ticks: { beginAtZero: true, max: maxTick },
                        },
                      ],
                    },
                  }}
                ></HorizontalBar>
              </div>
            </TabHelper>
          </>
        ),
      },
      {
        menuItem: "Evolution",
        render: () => (
          <TabHelper isAttached={false} key={Math.random() * 10000}>
            <PokemonEvolution evolutionLine={species}></PokemonEvolution>
            <PokemonForms pokemon={[].concat(poke, species)}></PokemonForms>
          </TabHelper>
        ),
      },
    ];
  };

  render() {
    const panes = this.getPanes();
    return (
      <TabWrapper
        menu={{
          secondary: true,
          pointing: true,
          style: {
            display: "flex",
            justifyContent: "center",
          },
        }}
        panes={panes}
      />
    );
  }
}

const mapStateToProps = (state) => {
  return { chart: state.chart };
};

export default connect(mapStateToProps, { setChartData })(PokemonTabs);
