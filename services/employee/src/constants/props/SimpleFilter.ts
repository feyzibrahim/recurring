export interface SimpleFilter {
  date?: {
    $gte?: Date;
    $lte?: Date;
  };
}
