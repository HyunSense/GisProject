package com.gis.mapper;

import com.gis.dto.GpsDto;
import com.gis.dto.LocalDto;
import com.gis.vo.Gps;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDate;
import java.util.List;

@Mapper
public interface GisLiveMapper {


//    Gps findLiveGpsByTempGps(LocalDate date);

    LocalDto findLocalDbOnToday(LocalDate date);

    GpsDto findLiveGpsByTempGps(String carNum);

    void callCreateGpsProcedure(@Param("carNum") String carNum);

    void callDeleteGpsProcedure(@Param("carNum") String carNum);

    void callCreatePointProcedure(@Param("carNum") String carNum);

    void callDeletePointProcedure(@Param("carNum") String carNum);

    void callCreateLineProcedure(@Param("carNum") String carNum);

    void callDeleteLineProcedure(@Param("carNum") String carNum);

    void saveLiveGps(GpsDto gpsDto);

    List<String> findCarNumTables();

}
