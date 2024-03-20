import Button from "../../../../../components/Button";
import RangeSlider from "../../../../../components/Form/RangeSlider";
import Select from "../../../../../components/Form/Select";

function Filter() {

  const options = [{
    id: "1",
    name: "Marca",
  }]

  return (
    <div className="hidden lg:block bg-white bg-opacity-75 p-4 rounded-md shadow-md">
      <h2 className="text-xl text-center font-bold mb-4">Encontre seu próximo veículo:</h2>

      <Select
        id="manufacturer"
        options={options}
      />

      <Select
        id="category"
        options={options}
      />

      <Select
        id="year"
        options={options}
      />

      <RangeSlider />
      <Button type="submit">
        Pesquisar
      </Button>
    </div>
  );
}

export default Filter;
