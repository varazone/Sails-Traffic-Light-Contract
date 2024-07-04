use std::fs::File;
use sails_idl_gen::program;

use traffic_light_app::TrafficLightProgram;

fn main() {
    gwasm_builder::build();

    let idl_file_path = "./traffic_light.idl";
    let idl_file = File::create(idl_file_path).unwrap();

    program::generate_idl::<TrafficLightProgram>(idl_file).unwrap(); 
}