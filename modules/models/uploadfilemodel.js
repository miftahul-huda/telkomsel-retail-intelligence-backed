const { Model, DataTypes } = require('sequelize');

class UploadFileModel extends Model {
    static initialize(sequelize, force=false)
    { 
        super.init({
            filename: DataTypes.TEXT,
            upload_date: DataTypes.DATE,
            picture_taken_date: DataTypes.DATE,
            picture_taken_by: DataTypes.STRING,
            uploaded_by_email: DataTypes.STRING,
            uploaded_by_fullname: DataTypes.STRING,
            uploaded_filename: DataTypes.TEXT,

            lon: DataTypes.DECIMAL,
            lat: DataTypes.DECIMAL,
            alt: DataTypes.DECIMAL,
            store_id: DataTypes.STRING,
            store_name: DataTypes.TEXT,

            exposure_time: DataTypes.DECIMAL,
            iso_speed_rating: DataTypes.DECIMAL,
            white_balance: DataTypes.DECIMAL,
            orientation: DataTypes.DECIMAL,
            flash: DataTypes.DECIMAL,
            fnumber: DataTypes.DECIMAL,

            pixel_width: DataTypes.DECIMAL,
            pixel_height: DataTypes.DECIMAL,
            dpi_weight: DataTypes.DECIMAL,
            dpi_height: DataTypes.DECIMAL,
            exif_image_width: DataTypes.DECIMAL,
            exit_image_height: DataTypes.DECIMAL,
            exif_version: DataTypes.DECIMAL,
            exif_offset: DataTypes.DECIMAL,
            make:   DataTypes.STRING,
            model: DataTypes.STRING,
            x_resolution: DataTypes.DECIMAL,
            y_resolution: DataTypes.DECIMAL,
            operator: DataTypes.STRING,
            operatorText: DataTypes.STRING,
            suboperator: DataTypes.STRING,

            isPoster: DataTypes.INTEGER,
            posterType: DataTypes.STRING,
            posterTypeText: DataTypes.STRING,
            areaPromotion: DataTypes.STRING,
            areaPromotionText: DataTypes.STRING,
            imageCategory: DataTypes.STRING,
            imageStatus: DataTypes.STRING,
            operatorDominant: DataTypes.STRING,
            operatorDominantText: DataTypes.STRING,
            posterTheme: DataTypes.STRING,

            //Information for Store front
            productHero: DataTypes.STRING,
            productHeroQuota: DataTypes.DECIMAL,
            productHeroPrice: DataTypes.DECIMAL,
            productHeroTransferPrice: DataTypes.DECIMAL,
            productHeroValidity: DataTypes.DECIMAL,
            productHeroCategory: DataTypes.STRING,
            productHeroTheme: DataTypes.STRING,

            beforeAfterID: DataTypes.STRING,
            beforeAfterType: DataTypes.STRING,

            isTransfered: DataTypes.INTEGER,
            isuploaded: DataTypes.INTEGER,
            tag: DataTypes.STRING

        }, 
        { sequelize, modelName: 'uploadfile', tableName: 'uploadfile', force: force });
    }
}

module.exports = UploadFileModel;