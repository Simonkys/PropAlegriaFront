import { Component, OnInit, OnDestroy } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Product } from './api/product';
import { ProductService } from './service/product.service';
import { Observable, Subscription } from 'rxjs';
import { LayoutService } from 'src/app/layout/service/app.layout.service';

import { DashboardService } from './dashboard.service';
import { DashboardMetrics } from './dashboard.model';
import { FormControl } from '@angular/forms';

@Component({
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

    items!: MenuItem[];

    products!: Product[];

    chartData: any;

    chartOptions: any;

    subscription!: Subscription;

    dashboardMetrics?: DashboardMetrics;

    data:any;

    infoSwith = new FormControl(false);

    options: any;
    typechart: string = 'doughnut';
    fechaActual = new Date();



    constructor(
        private productService: ProductService,
        public layoutService: LayoutService,
        private dashboardService: DashboardService,
    ) {
        this.subscription = this.layoutService.configUpdate$.subscribe(() => {
            this.initChart();
        });

    }

    ngOnInit() {
        this.dashboardService.getDashboardMetrics().subscribe(data => {
            this.dashboardMetrics = data
            this.initChartPie()
        })

        this.infoSwith.valueChanges.subscribe(data => {
            if (data) {
                this.initChart();

            }else{

                this.initChartPie();
            }
        }

            )
        this.productService.getProductsSmall().then(data => this.products = data);




        this.items = [
            { label: 'Add New', icon: 'pi pi-fw pi-plus' },
            { label: 'Remove', icon: 'pi pi-fw pi-minus' }
        ];
    }
    obtnerDiasMes=(fechaActual:Date)=>{
        let mesActual = fechaActual.getMonth();
        let fecha = new Date(fechaActual.getFullYear(), mesActual, 1)
        let diasMes = [];

        while(fecha.getMonth() === mesActual){
            diasMes.push(fecha.getDate().toString());
            fecha.setDate(fecha.getDate()+1);
        }
        return  diasMes
    }

    initChart() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.typechart = 'line'
        this.chartData = {
            labels: this.obtnerDiasMes(this.fechaActual),
            datasets: [
                {
                    label: 'Arriendos Por pagar',
                    data: [113, 95, 80, 70, 25, 23, 10, 8, 5, 3, 2, 2],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
                    borderColor: documentStyle.getPropertyValue('--bluegray-700'),
                    tension: .4
                },
                {
                    label: 'Arriendos Pagados',
                    data: [3, 21, 36, 46, 91, 93, 106, 108, 111, 113, 114, 114],
                    fill: false,
                    backgroundColor: documentStyle.getPropertyValue('--green-600'),
                    borderColor: documentStyle.getPropertyValue('--green-600'),
                    tension: .4
                }
            ]
        };
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        color: textColor
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                },
                y: {
                    ticks: {
                        color: textColorSecondary
                    },
                    grid: {
                        color: surfaceBorder,
                        drawBorder: false
                    }
                }
            }
        };
    }
    initChartPie() {
        const documentStyle = getComputedStyle(document.documentElement);
        const textColor = documentStyle.getPropertyValue('--text-color');
        const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
        const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
        this.typechart = 'doughnut'
        this.chartData = {
            labels: ['PENDIENTES','PAGADOS'],
            datasets: [
                {
                    label: 'First Dataset',
                    data: [this.dashboardMetrics?.total_arriendos_por_pagar, this.dashboardMetrics?.total_arriendos_pagados],
                    backgroundColor: ['#006C86','#8B0000'],
                    hoverBackgroundColor: ['#3E867C','#DC143C'  ]

                }

            ]
        };
        this.chartOptions = {
            plugins: {
                legend: {
                    labels: {
                        usePointStyle: true,
                        color: textColor
                    }
                }
            }
        };
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}
