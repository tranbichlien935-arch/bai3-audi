public class CarItem
{
    public int Id { get; set; }
    public string Name { get; set; } = "";
    public double Price { get; set; }
    public string ImageUrl { get; set; } = "";
    public int Stock { get; set; }
    public bool IsActive { get; set; } = true;
    // Thêm mấy cái này cho khớp với Frontend nha má
    public string Description { get; set; } = "";
    public bool IsFeatured { get; set; }
    public int CategoryId { get; set; }
    public int BrandId { get; set; }
}