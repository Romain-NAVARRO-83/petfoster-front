export interface ColumnConfig {
    size?: number | 12;   
    offset?: number | 0; 
    narrow?: boolean;
  }
  export interface ColumnsProps {
    mobile?: ColumnConfig;
    tablet?: ColumnConfig;
    desktop?: ColumnConfig;
    widescreen?: ColumnConfig;
    fullhd?: ColumnConfig;
  }