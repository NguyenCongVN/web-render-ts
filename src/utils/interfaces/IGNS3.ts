export interface Drawing {
    drawing_id: string;
    locked: boolean;
    rotation: number;
    svg: string;
    x: number;
    y: number;
    z: number;
}

export interface Filters {
}

export interface LinkStyle {
}

export interface Label {
    rotation: number;
    style: string;
    text: string;
    x: number;
    y: number;
}

export interface Node {
    adapter_number: number;
    label: Label;
    node_id: string;
    port_number: number;
}

export interface Link {
    filters: Filters;
    link_id: string;
    link_style: LinkStyle;
    nodes: Node[];
    suspend: boolean;
}

export interface Label2 {
    rotation: number;
    style: string;
    text: string;
    x: number;
    y: number;
}

export interface PortsMapping {
    ethertype: string;
    name: string;
    port_number: number;
    type: string;
    vlan: number;
}

export interface Properties {
    adapter_type: string;
    adapters: number;
    headless: boolean;
    linked_clone: boolean;
    on_close: string;
    usage: string;
    use_any_adapter: boolean;
    vmx_path: string;
    ports_mapping: PortsMapping[];
}

export interface Node2 {
    compute_id: string;
    console?: number;
    console_auto_start: boolean;
    console_type: string;
    custom_adapters: any[];
    first_port_name: string;
    height: number;
    label: Label2;
    locked: boolean;
    name: string;
    node_id: string;
    node_type: string;
    port_name_format: string;
    port_segment_size: number;
    properties: Properties;
    symbol: string;
    template_id: string;
    width: number;
    x: number;
    y: number;
    z: number;
}

export interface Topology {
    computes: any[];
    drawings: Drawing[];
    links: Link[];
    nodes: Node2[];
}

export interface RootObject {
    auto_close: boolean;
    auto_open: boolean;
    auto_start: boolean;
    drawing_grid_size: number;
    grid_size: number;
    name: string;
    project_id: string;
    revision: number;
    scene_height: number;
    scene_width: number;
    show_grid: boolean;
    show_interface_labels: boolean;
    show_layers: boolean;
    snap_to_grid: boolean;
    supplier?: any;
    topology: Topology;
    type: string;
    variables?: any;
    version: string;
    zoom: number;
}