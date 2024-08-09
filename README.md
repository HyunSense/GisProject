# 청소차량 관제시스템 (인원: 앱 2 + 웹 3)

## 개발환경
- Language: Java 17
- App: Android
- Frontend: Jsp, JavaScript, Ajax, chartJS,Html, Css(BootStrap)
- Backend: SpringBoot 3.1, ,Spring Batch 5, MyBatis
- DB: PostgreSQL
- Gis: GeoServer 2.2, Qgis, PostGis
- Api: OpenLayers, Vworld, GoogleMaps

## 목표
- 노면청소차량에 탑재된 센서를 이용하여 청소차량 관제시스템 구축
- 안드로이드 앱을 통해 차량 위치 및 경로 측정
- 차량센서를 대신하여 핸드폰 gps, 소음, 진동을 측정

## 프로젝트 주요 기능
- GeoServer를 통해 용인시 지역구 선택 및 이동 서비스
  1. PostGis와 GeoServer를 통해 구 레이어를 저장
  2. 저장된 레이어를 View로 전달 

- PostGis를 통해 청소차량의 측정된 데이터를 산출하여 청소경로 레이어 획득 서비스
  1. csv 형식으로 된 청소차량의 데이터 베이스에 저장
  2. 저장된 데이터를 PostGis를 통해 청소 경로, 비율, 시간을 계산
  3. 계산된 결과를 View로 전달
  
- 안드로이드앱과 웹서비스가 상호작용하여 실시간 차량의 위치 확인 가능
  1. 안드로이드 앱이 rest API 방식으로 1초 간격으로 센서 데이터 전송
  2. 서버에서 스케쥴러를 통해 주기적으로 데이터 응답
  3. 응답 데이터를 임시테이블에 저장
  4. 저장된 데이터중 최신 데이터를 주기적으로 View로 전달

## 역할
- 와이어프레임을 기반으로 프론트 뷰 제작
- 로컬 DB 자동화 모듈 구현
- 조건에 따른 레이어 기능 구현 및 출력
- 실시간 GPS 기능 구현

  
